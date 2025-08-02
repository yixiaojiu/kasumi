import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
	title: 'Kasumi',
	tagline: '一些展示组件',
	// favicon: 'img/favicon.ico',

	future: {
		v4: true,
	},

	url: 'https://your-docusaurus-site.example.com',
	baseUrl: '/',

	projectName: 'kasumi',

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	i18n: {
		defaultLocale: 'zh-CN',
		locales: ['zh-CN'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		navbar: {
			title: 'Kasumi',
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'guide',
					position: 'left',
					label: '指南',
				},
				{
					type: 'docSidebar',
					sidebarId: 'components',
					position: 'left',
					label: '组件',
				},
				{
					href: 'https://github.com/yixiaojiu/kasumi',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
}

export default config
