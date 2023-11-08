import { useDelayGroupContext } from '@floating-ui/react'
import { getSpace } from '@tamagui/get-token'
import { SizableStackProps } from '@tamagui/stacks'
import { Paragraph } from '@tamagui/text'
import * as React from 'react'

import { Tooltip, TooltipGroup, TooltipProps } from './Tooltip'

export type TooltipSimpleProps = TooltipProps & {
  label?: React.ReactNode
  children?: React.ReactNode
  contentProps?: SizableStackProps
}

export const TooltipSimple: React.FC<TooltipSimpleProps> = React.forwardRef(
  ({ label, children, contentProps, ...tooltipProps }, ref) => {
    let context
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      context = useDelayGroupContext()
    } catch {
      // ok
    }

    const child = React.Children.only(children)

    const contents = (
      <Tooltip offset={15} restMs={220} delay={160} {...tooltipProps}>
        <Tooltip.Trigger
          {...(typeof label === 'string' && {
            'aria-label': label,
          })}
          asChild
        >
          {React.isValidElement(child)
            ? React.cloneElement(child, { ref } as any)
            : child}
        </Tooltip.Trigger>
        <Tooltip.Content
          zIndex={1_000_000_000}
          enterStyle={{ x: 0, y: -8, opacity: 0, scale: 0.93 }}
          exitStyle={{ x: 0, y: -8, opacity: 0, scale: 0.93 }}
          x={0}
          scale={1}
          y={0}
          elevation="$1"
          opacity={1}
          paddingVertical={getSpace(tooltipProps.size || '$true', {
            shift: -3,
          })}
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          {...contentProps}
        >
          <Tooltip.Arrow />
          <Paragraph size="$2">{label}</Paragraph>
        </Tooltip.Content>
      </Tooltip>
    )

    if (!context) {
      return <TooltipGroup delay={defaultTooltipDelay}>{contents}</TooltipGroup>
    }

    return contents
  }
)

const defaultTooltipDelay = { open: 3000, close: 100 }
