import classNames from 'classnames'
import { useTheme } from 'next-themes'
import React from 'react'

enum BorderGradient {
  rainbow = 'bg-animated-gradient-1'
}

interface AnimatedBorderCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  borderGradient?: BorderGradient
  innerBackgroundColorDark?: string
  innerBackgroundColorLight?: string
  className?: string
  innerClassName?: string
  paddingClassName?: string
  roundedClassName?: string
}

export const AnimatedBorderCard = (props: AnimatedBorderCardProps) => {
  const {
    borderGradient,
    className,
    roundedClassName,
    paddingClassName,
    innerClassName,
    innerBackgroundColorDark,
    innerBackgroundColorLight,
    children,
    ...rest
  } = props
  const { theme, systemTheme } = useTheme()
  const innerBackgroundColor =
    theme === 'system'
      ? systemTheme === 'dark'
        ? innerBackgroundColorDark
        : innerBackgroundColorLight
      : theme === 'dark'
      ? innerBackgroundColorDark
      : innerBackgroundColorLight

  return (
    <div {...rest} className={classNames('p-1', borderGradient, roundedClassName, className)}>
      <div
        className={classNames(
          'backdrop-filter backdrop-blur-sm',
          innerClassName,
          paddingClassName,
          roundedClassName
        )}
        style={{ background: innerBackgroundColor + 'e6' }}
      >
        {children}
      </div>
    </div>
  )
}

AnimatedBorderCard.defaultProps = {
  borderGradient: BorderGradient.rainbow,
  paddingClassName: 'p-4',
  roundedClassName: 'rounded-lg',
  innerBackgroundColorDark: '#1c0454',
  innerBackgroundColorLight: '#f0e9ff'
}
