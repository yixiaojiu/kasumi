import clsx from 'clsx';
import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function Select({ options, value, onChange, placeholder = '请选择', disabled, className }: SelectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = useMemo(() => options.findIndex(o => o.value === value), [options, value]);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number>(selectedIndex >= 0 ? selectedIndex : 0);

  useEffect(() => {
    setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [selectedIndex]);

  const selectedOption = useMemo(
    () => (selectedIndex >= 0 ? options[selectedIndex] : undefined),
    [options, selectedIndex]
  );

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled]);
  const toggle = useCallback(() => !disabled && setIsOpen(o => !o), [disabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        close();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const handleSelect = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange?.(option.value);
    close();
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        open();
        return;
      }
      setHighlightIndex(idx => Math.min(idx + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        open();
        return;
      }
      setHighlightIndex(idx => Math.max(idx - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen) {
        open();
      } else {
        handleSelect(highlightIndex);
      }
    } else if (e.key === 'Escape') {
      close();
    }
  };

  return (
    <div ref={containerRef} className={clsx('kasumi-select', className)}>
      <button
        type="button"
        className={clsx('kasumi-select-trigger', disabled && 'is-disabled')}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        disabled={disabled}
      >
        <span className={clsx('kasumi-select-value', !selectedOption && 'is-placeholder')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </button>

      {isOpen ? (
        <div className="kasumi-select-popover">
          <div ref={listboxRef} className="kasumi-select-list">
            {options.map((opt, idx) => {
              const isSelected = idx === selectedIndex;
              const isActive = idx === highlightIndex;
              return (
                <button
                  type="button"
                  key={opt.value}
                  className={clsx('kasumi-select-option', isActive && 'is-active', isSelected && 'is-selected')}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(idx)}
                >
                  <span className="kasumi-select-option-label">{opt.label}</span>
                  {isSelected ? (
                    <span className="kasumi-select-check" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
