import clsx from 'clsx';
import './index.css';
import { ReactNode } from 'react';

export interface LoadingProps {
  isLoading?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface ErrorIconProps {
  error: Error;
}

export const Loading = ({ className, children, isLoading }: LoadingProps) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className={clsx('kasumi-loading-container', className)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-dasharray="16"
          stroke-dashoffset="16"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3c4.97 0 9 4.03 9 9"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
    </div>
  );
};

export const ShowError = ({ error }: ErrorIconProps) => {
  return (
    <div className="kasumi-error-container">
      <svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} viewBox="0 0 16 16">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4s-3.2.1-4.6-.7s-2.5-2-3.1-3.5S.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1S2.7 4.9 2.3 6.3c-.4 1.3-.4 2.7.2 4q.9 1.95 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z"
          clip-rule="evenodd"
        />
      </svg>
      <div>Σ(oﾟдﾟoﾉ) 发生了一些错误</div>
      <div>{`message: ${error?.message}`}</div>
    </div>
  );
};
