const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

// 将exec转换为Promise版本以便使用async/await
const execAsync = util.promisify(exec);

const cjsTsConfigPath = path.join(__dirname, '../tsconfig.cjs.json');
const esmTsConfigPath = path.join(__dirname, '../tsconfig.esm.json');

/**
 * 执行TypeScript编译命令
 */
async function compileTypeScript(configPath) {
  console.log(`开始编译TypeScript文件, ts 配置文件{configPath}`);
  try {
    const { stdout, stderr } = await execAsync(`pnpm exec tsc -p ${configPath}`);
    if (stdout) console.log('编译输出:', stdout);
    if (stderr) console.warn('编译警告:', stderr);
    console.log('TypeScript编译完成');
  } catch (error) {
    console.error('TypeScript编译失败:', error);
    process.exit(1);
  }
}

/**
 * 清理dist目录
 */
async function cleanDistDir() {
  const distDir = path.join(__dirname, '../dist');
  await fs.promises.rm(distDir, { recursive: true, force: true });
}

/**
 * 递归复制CSS文件并保持目录结构
 */
async function copyCssFiles(srcDir, destDir) {
  console.log('开始复制CSS文件...');
  console.log(`源目录: ${srcDir}`);
  console.log(`目标目录: ${destDir}`);

  async function copyRecursive(currentDir) {
    // 读取当前目录下的所有文件和子目录
    const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(currentDir, entry.name);
      // 计算相对于src目录的路径
      const relativePath = path.relative(srcDir, currentDir);
      const destPath = path.join(destDir, relativePath, entry.name);

      if (entry.isDirectory()) {
        // 如果是目录，递归处理
        await fs.promises.mkdir(destPath, { recursive: true });
        await copyRecursive(srcPath);
      } else if (entry.isFile() && path.extname(srcPath) === '.css') {
        // 如果是CSS文件，复制到目标目录
        await fs.promises.copyFile(srcPath, destPath);
        console.log(`已复制: ${srcPath} -> ${destPath}`);
      }
    }
  }

  try {
    // 确保目标目录存在
    await fs.promises.mkdir(destDir, { recursive: true });
    await copyRecursive(srcDir);
    console.log('CSS文件复制完成');
  } catch (error) {
    console.error('CSS文件复制失败:', error.message);
    process.exit(1);
  }
}

/**
 * 主函数，按顺序执行编译和复制操作
 */
async function main() {
  await cleanDistDir();
  await compileTypeScript(cjsTsConfigPath);
  await compileTypeScript(esmTsConfigPath);
  await copyCssFiles(path.join(__dirname, '../src'), path.join(__dirname, '../dist', 'cjs'));
  await copyCssFiles(path.join(__dirname, '../src'), path.join(__dirname, '../dist', 'esm'));
  console.log('构建成功完成!');
}

// 执行主函数
main();
