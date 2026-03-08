import type {
    CartesianGridProps,
    LegendPayload,
    LegendProps,
    CartesianGridProps as RechartsCartesianGridProps,
    XAxisProps as RechartsXAxisProps,
    YAxisProps as RechartsYAxisProps,
} from 'recharts'
import type { ContentType as LegendContentType } from 'recharts/types/component/DefaultLegendContent'
import type {
    NameType,
    Props as TooltipContentProps,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import type { ContentType as TooltipContentType } from 'recharts/types/component/Tooltip'
import {
    type ComponentProps,
    createContext,
    Fragment,
    type ReactElement,
    startTransition,
    use,
    useCallback,
    useId,
    useMemo,
    useState,
} from 'react'
import {
    composeRenderProps,
    ToggleButton,
    ToggleButtonGroup,
    type ToggleButtonGroupProps,
} from 'react-aria-components'
import {
    Area,
    Bar,
    Cell,
    Line,
    type LineProps,
    Pie,
    AreaChart as RechartsAreaChart,
    BarChart as RechartsBarChart,
    CartesianGrid as RechartsCartesianGrid,
    Legend as RechartsLegend,
    LineChart as RechartsLineChart,
    PieChart as RechartsPieChart,
    Tooltip as RechartsTooltip,
    XAxis as RechartsXAxis,
    YAxis as RechartsYAxis,
    ResponsiveContainer,
} from 'recharts'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

// #region Chart Types
type ChartType = 'default' | 'stacked' | 'percent'
type ChartLayout = 'horizontal' | 'vertical' | 'radial'
type IntervalType = 'preserveStartEnd' | 'equidistantPreserveStart'

type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode
        icon?: React.ComponentType
    } & (
        | { color?: ChartColorKeys | (string & {}); theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
    )
}

const CHART_COLORS = {
    'chart-1': 'var(--chart-1)',
    'chart-2': 'var(--chart-2)',
    'chart-3': 'var(--chart-3)',
    'chart-4': 'var(--chart-4)',
    'chart-5': 'var(--chart-5)',
} as const

type ChartColorKeys = keyof typeof CHART_COLORS | (string & {})

const DEFAULT_COLORS = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const

// #endregion

// #region Chart Context

type ChartContextProps = {
    config: ChartConfig
    data?: Record<string, any>[]
    layout: ChartLayout
    dataKey?: string
    selectedLegend: string | null
    onLegendSelect: (legendItem: string | null) => void
}

const ChartContext = createContext<ChartContextProps | null>(null)

export function useChart() {
    const context = use(ChartContext)

    if (!context) {
        throw new Error('useChart must be used within a <Chart />')
    }

    return context
}

// #endregion

// #region helpers

export function valueToPercent(value: number) {
    return `${(value * 100).toFixed(0)}%`
}

const constructCategoryColors = (
    categories: string[],
    colors: readonly ChartColorKeys[],
): Map<string, ChartColorKeys> => {
    const categoryColors = new Map<string, ChartColorKeys>()

    categories.forEach((category, index) => {
        const color = colors[index % colors.length]
        if (color !== undefined) {
            categoryColors.set(category, color)
        }
    })

    return categoryColors
}

const getColorValue = (color?: string): string => {
    if (!color) {
        return 'var(--chart-1)'
    }

    return CHART_COLORS[color as 'chart-1'] ?? color
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
    if (typeof payload !== 'object' || payload === null) {
        return undefined
    }

    const payloadPayload =
        'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
            ? payload.payload
            : undefined

    let configLabelKey: string = key

    if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
        configLabelKey = payload[key as keyof typeof payload] as string
    } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
    ) {
        configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
    }

    return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

// #endregion

// #region Base Chart Components

interface BaseChartProps<TValue extends ValueType, TName extends NameType>
    extends React.HTMLAttributes<HTMLDivElement> {
    containerHeight?: number
    config: ChartConfig
    data: Record<string, any>[]
    dataKey: string
    colors?: readonly (ChartColorKeys | (string & {}))[]
    type?: ChartType
    intervalType?: IntervalType
    layout?: ChartLayout
    valueFormatter?: (value: number) => string

    tooltip?: TooltipContentType<TValue, TName> | boolean
    tooltipProps?: Omit<ChartTooltipProps<TValue, TName>, 'content'> & {
        hideLabel?: boolean
        labelSeparator?: boolean
        hideIndicator?: boolean
        indicator?: 'line' | 'dot' | 'dashed'
        nameKey?: string
        labelKey?: string
    }

    cartesianGridProps?: CartesianGridProps

    legend?: LegendContentType | boolean
    legendProps?: Omit<React.ComponentProps<typeof RechartsLegend>, 'content' | 'ref'>

    xAxisProps?: RechartsXAxisProps
    yAxisProps?: RechartsYAxisProps

    // XAxis
    displayEdgeLabelsOnly?: boolean

    hideGridLines?: boolean
    hideXAxis?: boolean
    hideYAxis?: boolean
}

const Chart = ({
    id,
    className,
    children,
    config,
    data,
    dataKey,
    ref,
    layout = 'horizontal',
    containerHeight,
    ...props
}: Omit<React.ComponentProps<'div'>, 'children'> &
    Pick<ChartContextProps, 'data' | 'dataKey'> & {
        config: ChartConfig
        containerHeight?: number
        layout?: ChartLayout
        children: ReactElement | ((props: ChartContextProps) => ReactElement)
    }) => {
    const isMobile = useIsMobile()
    const uniqueId = useId()
    const chartId = useMemo(() => `chart-${id || uniqueId.replace(/:/g, '')}`, [id, uniqueId])

    const [selectedLegend, setSelectedLegend] = useState<string | null>(null)

    const onLegendSelect = useCallback((legendItem: string | null) => {
        setSelectedLegend(legendItem)
    }, [])

    const _data = data ?? []
    const _dataKey = dataKey ?? 'value'

    const value = {
        config,
        selectedLegend,
        onLegendSelect,
        data: _data,
        dataKey: _dataKey,
        layout,
    }

    return (
        <ChartContext value={value}>
            <div
                className={cn(
                    'z-20 flex w-full justify-center text-xs',
                    "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/80 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
                    // dot
                    "[&_.recharts-dot[fill='#fff']]:fill-(--line-color)",
                    // when hover over the line chart, the active dot should not have a fill or stroke
                    '[&_.recharts-active-dot>.recharts-dot]:stroke-foreground/10',
                    className,
                )}
                data-chart={chartId}
                data-slot='chart'
                ref={ref}
                {...props}
            >
                <ChartStyle config={config} id={chartId} />
                <ResponsiveContainer height={containerHeight ?? (isMobile ? 200 : 370)}>
                    {typeof children === 'function' ? children(value) : children}
                </ResponsiveContainer>
            </div>
        </ChartContext>
    )
}

const THEMES = { light: '', dark: '.dark' } as const
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color)

    if (!colorConfig.length) {
        return null
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
    .map(([key, itemConfig]) => {
        const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
        return color ? `  --color-${key}: ${color};` : null
    })
    .join('\n')}
}
`,
                    )
                    .join('\n'),
            }}
        />
    )
}

type ChartTooltipProps<TValue extends ValueType, TName extends NameType> = React.ComponentProps<
    typeof RechartsTooltip<TValue, TName>
>

const ChartTooltip = <TValue extends ValueType, TName extends NameType>(
    props: ChartTooltipProps<TValue, TName>,
) => {
    const { layout } = useChart()

    return (
        <RechartsTooltip
            animationDuration={500}
            cursor={{
                stroke: 'var(--muted)',
                strokeWidth: layout === 'radial' ? 0.1 : 1,
                fill: 'var(--muted)',
                fillOpacity: 0.5,
            }}
            isAnimationActive={true}
            offset={10}
            wrapperStyle={{ outline: 'none' }}
            {...props}
        />
    )
}

type ChartLegendProps = Omit<React.ComponentProps<typeof RechartsLegend>, 'ref'>

const ChartLegend = (props: ChartLegendProps) => {
    return <RechartsLegend align='center' verticalAlign='bottom' {...props} />
}

interface XAxisProps extends Omit<RechartsXAxisProps, 'ref'> {
    displayEdgeLabelsOnly?: boolean
    intervalType?: IntervalType
}

const XAxis = ({
    displayEdgeLabelsOnly,
    className,
    intervalType = 'preserveStartEnd',
    minTickGap = 5,
    domain = ['auto', 'auto'],
    ...props
}: XAxisProps) => {
    const { dataKey, data, layout } = useChart()

    const ticks =
        displayEdgeLabelsOnly && data?.length && dataKey
            ? [data[0]?.[dataKey], data[data.length - 1]?.[dataKey]]
            : undefined

    const tick = {
        transform: layout === 'horizontal' ? 'translate(32, 6)' : undefined,
    }
    return (
        <RechartsXAxis
            axisLine={false}
            className={cn(
                'text-muted-foreground text-xs **:[text]:fill-muted-foreground',
                className,
            )}
            dataKey={layout === 'horizontal' ? dataKey : undefined}
            interval={displayEdgeLabelsOnly ? 'preserveStartEnd' : intervalType}
            minTickGap={minTickGap}
            tick={tick}
            tickLine={false}
            ticks={ticks}
            {...props}
        />
    )
}

const YAxis = ({
    className,
    width,
    domain = ['auto', 'auto'],
    type,
    ...props
}: Omit<RechartsYAxisProps, 'ref'>) => {
    const { layout, dataKey } = useChart()

    return (
        <RechartsYAxis
            axisLine={false}
            className={cn(
                'text-muted-foreground text-xs **:[text]:fill-muted-foreground',
                className,
            )}
            dataKey={layout === 'horizontal' ? undefined : dataKey}
            domain={domain}
            interval={layout === 'horizontal' ? undefined : 'equidistantPreserveStart'}
            tick={{
                transform: layout === 'horizontal' ? 'translate(-3, 0)' : 'translate(0, 0)',
            }}
            tickLine={false}
            type={type || layout === 'horizontal' ? 'number' : 'category'}
            width={(width ?? layout === 'horizontal') ? 40 : 80}
            {...props}
        />
    )
}

const CartesianGrid = ({ className, ...props }: RechartsCartesianGridProps) => {
    const { layout } = useChart()
    return (
        <RechartsCartesianGrid
            className={cn('stroke-1 stroke-muted', className)}
            horizontal={layout !== 'vertical'}
            vertical={layout === 'vertical'}
            {...props}
        />
    )
}

const ChartTooltipContent = <TValue extends ValueType, TName extends NameType>({
    payload,
    className,
    indicator = 'dot',
    hideLabel = false,
    hideIndicator = false,
    label,
    labelSeparator = true,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
    ref,
}: TooltipContentProps<TValue, TName> &
    React.ComponentProps<'div'> & {
        hideLabel?: boolean
        labelSeparator?: boolean
        hideIndicator?: boolean
        indicator?: 'line' | 'dot' | 'dashed'
        nameKey?: string
        labelKey?: string
    }) => {
    const { config } = useChart()

    const tooltipLabel = useMemo(() => {
        if (hideLabel || !payload?.length) {
            return null
        }

        const [item] = payload

        if (!item) {
            return null
        }

        const key = `${labelKey || item.dataKey || item.name || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        const value =
            !labelKey && typeof label === 'string'
                ? config[label as keyof typeof config]?.label || label
                : itemConfig?.label

        if (labelFormatter) {
            return <div className={labelClassName}>{labelFormatter(value, payload)}</div>
        }

        if (!value) {
            return null
        }

        return <div className={labelClassName}>{value}</div>
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!payload?.length) {
        return null
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot'

    return (
        <div
            className={cn(
                'grid min-w-48 items-start rounded-lg bg-overlay/70 p-3 py-2 text-overlay-foreground text-xs ring ring-current/10 backdrop-blur-lg',
                className,
            )}
            ref={ref}
        >
            {!hideLabel && (
                <>
                    {!nestLabel ? <span className='font-medium'>{tooltipLabel}</span> : null}
                    {labelSeparator && (
                        <span
                            aria-hidden
                            className='mt-2 mb-3 block h-px w-full bg-background/10'
                        />
                    )}
                </>
            )}
            <div className='grid gap-3'>
                {payload.map((item, index) => {
                    const key = `${nameKey || item.name || item.dataKey || 'value'}`
                    const itemConfig = getPayloadConfigFromPayload(config, item, key)
                    const indicatorColor = color || item.payload.fill || item.color

                    return (
                        <div
                            className={cn(
                                'flex w-full flex-wrap items-stretch gap-2 *:data-[slot=icon]:text-muted-foreground',
                                indicator === 'dot' && 'items-center *:data-[slot=icon]:size-2.5',
                                indicator === 'line' &&
                                    '*:data-[slot=icon]:h-full *:data-[slot=icon]:w-2.5',
                            )}
                            key={key}
                        >
                            {formatter && item?.value !== undefined && item.name ? (
                                formatter(item.value, item.name, item, index, item.payload)
                            ) : (
                                <>
                                    {itemConfig?.icon ? (
                                        <itemConfig.icon />
                                    ) : (
                                        !hideIndicator && (
                                            <div
                                                className={cn(
                                                    'shrink-0 rounded-full border-(--color-border) bg-(--color-bg)',
                                                    indicator === 'dot' && 'size-2.5',
                                                    indicator === 'line' && 'w-1',
                                                    indicator === 'dashed' &&
                                                        'w-0 border-[1.5px] border-dashed bg-transparent',
                                                    nestLabel && indicator === 'dashed' && 'my-0.5',
                                                )}
                                                style={
                                                    {
                                                        '--color-bg': indicatorColor,
                                                        '--color-border': indicatorColor,
                                                    } as React.CSSProperties
                                                }
                                            />
                                        )
                                    )}
                                    <div
                                        className={cn(
                                            'flex flex-1 justify-between leading-none',
                                            nestLabel ? 'items-end' : 'items-center',
                                        )}
                                    >
                                        <div className='grid gap-1.5'>
                                            {nestLabel ? tooltipLabel : null}
                                            <span className='text-muted-foreground'>
                                                {itemConfig?.label || item.name}
                                            </span>
                                        </div>

                                        {item.value && (
                                            <span className='font-medium font-mono text-foreground tabular-nums'>
                                                {item.value.toString()}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

type ChartLegendContentProps = ToggleButtonGroupProps &
    Pick<LegendProps, 'align' | 'verticalAlign'> & {
        payload?: ReadonlyArray<LegendPayload>
        hideIcon?: boolean
        nameKey?: string
        ref?: React.Ref<any>
    }

const ChartLegendContent = ({
    className,
    hideIcon = false,
    payload,
    align = 'right',
    verticalAlign = 'bottom',
    nameKey,
    ref,
}: ChartLegendContentProps) => {
    const { config, selectedLegend, onLegendSelect } = useChart()

    if (!payload?.length) {
        return null
    }

    return (
        <ToggleButtonGroup
            className={composeRenderProps(className, (className) =>
                cn(
                    'flex flex-wrap items-center gap-x-1',
                    verticalAlign === 'top' ? 'pb-3' : 'pt-3',
                    align === 'right'
                        ? 'justify-end'
                        : align === 'left'
                          ? 'justify-start'
                          : 'justify-center',
                    className,
                ),
            )}
            onSelectionChange={(v) => {
                const key = [...v][0]?.toString() ?? null
                onLegendSelect(key)
            }}
            ref={ref}
            selectedKeys={selectedLegend ? [selectedLegend] : undefined}
            selectionMode='single'
        >
            {payload.map((item: LegendPayload) => {
                const key = `${nameKey || item.dataKey || 'value'}`
                const itemConfig = getPayloadConfigFromPayload(config, item, key)

                return (
                    <ToggleButton
                        aria-label={'Legend Item'}
                        className={cn(
                            'flex items-center gap-2 rounded-sm px-2 py-1 text-muted-foreground *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:size-2.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-muted-foreground',
                            'selected:bg-secondary/70 selected:text-secondary-foreground',
                            'hover:bg-secondary/70 hover:text-secondary-foreground',
                        )}
                        id={key}
                        key={key}
                    >
                        {itemConfig?.icon && !hideIcon ? (
                            <itemConfig.icon data-slot='icon' />
                        ) : (
                            <div
                                className='rounded-full'
                                data-slot='icon'
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />
                        )}
                        {itemConfig?.label}
                    </ToggleButton>
                )
            })}
        </ToggleButtonGroup>
    )
}

interface AreaChartProps<TValue extends ValueType, TName extends NameType>
    extends BaseChartProps<TValue, TName> {
    chartProps?: Omit<ComponentProps<typeof RechartsAreaChart>, 'data' | 'stackOffset'>
    areaProps?: Partial<ComponentProps<typeof Area>>
    connectNulls?: boolean
    fillType?: 'gradient' | 'solid' | 'none'
}

const AreaChart = <TValue extends ValueType, TName extends NameType>({
    data = [],
    dataKey,
    colors = DEFAULT_COLORS,
    connectNulls = false,
    type = 'default',

    fillType = 'gradient',
    config,
    children,

    areaProps,

    // Components
    tooltip = true,
    tooltipProps,

    cartesianGridProps,

    legend = true,
    legendProps,

    intervalType = 'equidistantPreserveStart',

    valueFormatter = (value: number) => value.toString(),

    // XAxis
    displayEdgeLabelsOnly = false,
    hideXAxis = false,
    xAxisProps,

    // YAxis
    hideYAxis = false,
    yAxisProps,

    hideGridLines = false,
    chartProps,
    ...props
}: AreaChartProps<TValue, TName>) => {
    const categoryColors = constructCategoryColors(Object.keys(config), colors)
    const stacked = type === 'stacked' || type === 'percent'
    const areaId = useId()
    const getFillContent = ({
        fillType,
        activeLegend,
        category,
    }: {
        fillType: AreaChartProps<TValue, TName>['fillType']
        activeLegend: string | null
        category: string
    }) => {
        const stopOpacity = activeLegend && activeLegend !== category ? 0.1 : 0.5

        switch (fillType) {
            case 'none':
                return <stop stopColor='currentColor' stopOpacity={0} />
            case 'gradient':
                return (
                    <>
                        <stop offset='5%' stopColor='currentColor' stopOpacity={stopOpacity} />
                        <stop offset='95%' stopColor='currentColor' stopOpacity={0} />
                    </>
                )
            default:
                return <stop stopColor='currentColor' stopOpacity={stopOpacity} />
        }
    }

    return (
        <Chart config={config} data={data} dataKey={dataKey} {...props}>
            {({ onLegendSelect, selectedLegend }) => (
                <RechartsAreaChart
                    data={data}
                    margin={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 5,
                    }}
                    onClick={() => {
                        onLegendSelect(null)
                    }}
                    stackOffset={type === 'percent' ? 'expand' : undefined}
                    {...chartProps}
                >
                    {!hideGridLines && (
                        <CartesianGrid {...cartesianGridProps} strokeDasharray='3 3' />
                    )}
                    <XAxis
                        className='**:[text]:fill-muted-foreground'
                        displayEdgeLabelsOnly={displayEdgeLabelsOnly}
                        hide={hideXAxis}
                        intervalType={intervalType}
                        {...xAxisProps}
                    />
                    <YAxis
                        className='**:[text]:fill-muted-foreground'
                        hide={hideYAxis}
                        tickFormatter={type === 'percent' ? valueToPercent : valueFormatter}
                        {...yAxisProps}
                    />

                    {legend && (
                        <ChartLegend
                            content={typeof legend === 'boolean' ? <ChartLegendContent /> : legend}
                            {...legendProps}
                        />
                    )}

                    {tooltip && (
                        <ChartTooltip
                            content={
                                typeof tooltip === 'boolean' ? (
                                    <ChartTooltipContent
                                        {...{
                                            hideIndicator: tooltipProps?.hideIndicator,
                                            hideLabel: tooltipProps?.hideLabel,
                                            cursor: tooltipProps?.cursor,
                                            indicator: tooltipProps?.indicator,
                                            labelSeparator: tooltipProps?.labelSeparator,
                                            formatter: tooltipProps?.formatter,
                                            labelFormatter: tooltipProps?.labelFormatter,
                                        }}
                                        accessibilityLayer
                                    />
                                ) : (
                                    tooltip
                                )
                            }
                            {...tooltipProps}
                        />
                    )}

                    {!children
                        ? Object.entries(config).map(([category, values]) => {
                              const categoryId = `${areaId}-${category.replace(/[^a-zA-Z0-9]/g, '')}`

                              const strokeOpacity =
                                  selectedLegend && selectedLegend !== category ? 0.1 : 1

                              return (
                                  <Fragment key={categoryId}>
                                      <defs>
                                          <linearGradient
                                              id={categoryId}
                                              style={{
                                                  color: getColorValue(
                                                      values.color || categoryColors.get(category),
                                                  ),
                                              }}
                                              x1='0'
                                              x2='0'
                                              y1='0'
                                              y2='1'
                                          >
                                              {getFillContent({
                                                  fillType,
                                                  activeLegend: selectedLegend,
                                                  category: category,
                                              })}
                                          </linearGradient>
                                      </defs>
                                      <Area
                                          connectNulls={connectNulls}
                                          dataKey={category}
                                          dot={false}
                                          fill={`url(#${categoryId})`}
                                          isAnimationActive={true}
                                          name={category}
                                          stackId={stacked ? 'stack' : undefined}
                                          stroke={getColorValue(
                                              values.color || categoryColors.get(category),
                                          )}
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          style={{
                                              strokeWidth: 2,
                                              strokeOpacity,
                                          }}
                                          {...areaProps}
                                      />
                                  </Fragment>
                              )
                          })
                        : children}
                </RechartsAreaChart>
            )}
        </Chart>
    )
}

interface BarChartProps<TValue extends ValueType, TName extends NameType>
    extends BaseChartProps<TValue, TName> {
    barCategoryGap?: number
    barRadius?: number
    barGap?: number
    barSize?: number
    barProps?: Partial<React.ComponentProps<typeof Bar>>

    chartProps?: Omit<ComponentProps<typeof RechartsBarChart>, 'data' | 'stackOffset'>
}

const BarChart = <TValue extends ValueType, TName extends NameType>({
    data = [],
    dataKey,
    colors = DEFAULT_COLORS,
    type = 'default',
    config,
    children,
    layout = 'horizontal',

    // Components
    tooltip = true,
    tooltipProps,

    legend = true,
    legendProps,

    intervalType = 'equidistantPreserveStart',

    barCategoryGap = 5,
    barGap,
    barSize,
    barRadius,
    barProps,

    valueFormatter = (value: number) => value.toString(),

    // XAxis
    displayEdgeLabelsOnly = false,
    xAxisProps,
    hideXAxis = false,

    // YAxis
    yAxisProps,
    hideYAxis = false,

    hideGridLines = false,
    chartProps,

    ...props
}: BarChartProps<TValue, TName>) => {
    const categoryColors = constructCategoryColors(Object.keys(config), colors)

    const stacked = type === 'stacked' || type === 'percent'
    return (
        <Chart config={config} data={data} dataKey={dataKey} layout={layout} {...props}>
            {({ onLegendSelect, selectedLegend }) => (
                <RechartsBarChart
                    barCategoryGap={barCategoryGap}
                    barGap={barGap}
                    barSize={barSize}
                    data={data}
                    layout={layout === 'radial' ? 'horizontal' : layout}
                    margin={{
                        bottom: 0,
                        left: 5,
                        right: 0,
                        top: 5,
                    }}
                    onClick={() => {
                        onLegendSelect(null)
                    }}
                    stackOffset={type === 'percent' ? 'expand' : stacked ? 'sign' : undefined}
                    {...chartProps}
                >
                    {!hideGridLines && <CartesianGrid strokeDasharray='4 4' />}
                    <XAxis
                        className='**:[text]:fill-muted-foreground'
                        displayEdgeLabelsOnly={displayEdgeLabelsOnly}
                        hide={hideXAxis}
                        intervalType={intervalType}
                        {...xAxisProps}
                    />
                    <YAxis
                        className='**:[text]:fill-muted-foreground'
                        hide={hideYAxis}
                        tickFormatter={type === 'percent' ? valueToPercent : valueFormatter}
                        {...yAxisProps}
                    />

                    {legend && (
                        <ChartLegend
                            content={typeof legend === 'boolean' ? <ChartLegendContent /> : legend}
                            {...legendProps}
                        />
                    )}

                    {tooltip && (
                        <ChartTooltip
                            content={
                                typeof tooltip === 'boolean' ? (
                                    <ChartTooltipContent accessibilityLayer />
                                ) : (
                                    tooltip
                                )
                            }
                            {...tooltipProps}
                        />
                    )}

                    {!children
                        ? Object.entries(config).map(([category, values]) => {
                              return (
                                  <Bar
                                      dataKey={category}
                                      fill={getColorValue(
                                          values.color || categoryColors.get(category),
                                      )}
                                      fillOpacity={
                                          selectedLegend && selectedLegend !== category ? 0.1 : 1
                                      }
                                      key={category}
                                      name={category}
                                      onClick={(_item, _number, event) => {
                                          event.stopPropagation()

                                          startTransition(() => {
                                              onLegendSelect(category)
                                          })
                                      }}
                                      radius={barRadius ?? (stacked ? undefined : 4)}
                                      stackId={stacked ? 'stack' : undefined}
                                      stroke={getColorValue(
                                          values.color || categoryColors.get(category),
                                      )}
                                      strokeOpacity={
                                          selectedLegend && selectedLegend !== category ? 0.2 : 0
                                      }
                                      strokeWidth={1}
                                      {...barProps}
                                  />
                              )
                          })
                        : children}
                </RechartsBarChart>
            )}
        </Chart>
    )
}

interface LineChartProps<TValue extends ValueType, TName extends NameType>
    extends BaseChartProps<TValue, TName> {
    connectNulls?: boolean
    lineProps?: LineProps
    chartProps?: Omit<React.ComponentProps<typeof RechartsLineChart>, 'data' | 'stackOffset'>
}

const LineChart = <TValue extends ValueType, TName extends NameType>({
    data = [],
    dataKey,
    colors = DEFAULT_COLORS,
    connectNulls = false,
    type = 'default',
    config,
    children,

    // Components
    tooltip = true,
    tooltipProps,

    legend = true,
    legendProps,

    intervalType = 'equidistantPreserveStart',

    valueFormatter = (value: number) => value.toString(),

    // XAxis
    displayEdgeLabelsOnly = false,
    xAxisProps,
    hideXAxis = false,

    // YAxis
    yAxisProps,
    hideYAxis = false,

    hideGridLines = false,
    chartProps,
    lineProps,
    ...props
}: LineChartProps<TValue, TName>) => {
    const categoryColors = constructCategoryColors(Object.keys(config), colors)

    return (
        <Chart config={config} data={data} dataKey={dataKey} {...props}>
            {({ onLegendSelect, selectedLegend }) => (
                <RechartsLineChart
                    data={data}
                    margin={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 5,
                    }}
                    onClick={() => {
                        onLegendSelect(null)
                    }}
                    stackOffset={type === 'percent' ? 'expand' : undefined}
                    {...chartProps}
                >
                    {!hideGridLines && <CartesianGrid strokeDasharray='4 4' />}
                    <XAxis
                        displayEdgeLabelsOnly={displayEdgeLabelsOnly}
                        hide={hideXAxis}
                        intervalType={intervalType}
                        {...xAxisProps}
                    />
                    <YAxis
                        hide={hideYAxis}
                        tickFormatter={type === 'percent' ? valueToPercent : valueFormatter}
                        {...yAxisProps}
                    />

                    {legend && (
                        <ChartLegend
                            content={typeof legend === 'boolean' ? <ChartLegendContent /> : legend}
                            {...legendProps}
                        />
                    )}

                    {tooltip && (
                        <ChartTooltip
                            content={
                                typeof tooltip === 'boolean' ? (
                                    <ChartTooltipContent accessibilityLayer />
                                ) : (
                                    tooltip
                                )
                            }
                            {...tooltipProps}
                        />
                    )}

                    {!children
                        ? Object.entries(config).map(([category, values]) => {
                              const strokeOpacity =
                                  selectedLegend && selectedLegend !== category ? 0.1 : 1

                              return (
                                  <Line
                                      connectNulls={connectNulls}
                                      dataKey={category}
                                      dot={false}
                                      key={category}
                                      name={category}
                                      stroke={getColorValue(
                                          values.color || categoryColors.get(category),
                                      )}
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      style={
                                          {
                                              strokeOpacity,
                                              strokeWidth: 2,
                                              '--line-color': getColorValue(
                                                  values.color || categoryColors.get(category),
                                              ),
                                          } as React.CSSProperties
                                      }
                                      type='linear'
                                      {...lineProps}
                                  />
                              )
                          })
                        : children}
                </RechartsLineChart>
            )}
        </Chart>
    )
}

const sumNumericArray = (arr: number[]): number => arr.reduce((sum, num) => sum + num, 0)

const calculateDefaultLabel = (data: any[], valueKey: string): number =>
    sumNumericArray(data.map((dataPoint) => dataPoint[valueKey]))

const parseLabelInput = (
    labelInput: string | undefined,
    valueFormatter: (value: number) => string,
    data: any[],
    valueKey: string,
): string => labelInput || valueFormatter(calculateDefaultLabel(data, valueKey))

interface PieChartProps<TValue extends ValueType, TName extends NameType>
    extends Omit<
        BaseChartProps<TValue, TName>,
        | 'hideGridLines'
        | 'hideXAxis'
        | 'hideYAxis'
        | 'xAxisProps'
        | 'yAxisProps'
        | 'displayEdgeLabelsOnly'
        | 'legend'
        | 'legendProps'
    > {
    variant?: 'pie' | 'donut'
    nameKey?: string

    chartProps?: Omit<ComponentProps<typeof RechartsPieChart>, 'data' | 'stackOffset'>

    label?: string
    showLabel?: boolean
    pieProps?: Omit<ComponentProps<typeof Pie>, 'data' | 'dataKey' | 'name'>
}

const PieChart = <TValue extends ValueType, TName extends NameType>({
    data = [],
    dataKey,
    colors = DEFAULT_COLORS,
    config,
    children,
    label,
    showLabel,

    // Components
    tooltip = true,
    tooltipProps,

    variant = 'pie',
    nameKey,

    chartProps,

    valueFormatter = (value: number) => value.toString(),
    pieProps,
    ...props
}: PieChartProps<TValue, TName>) => {
    const parsedLabelInput = parseLabelInput(label, valueFormatter, data, dataKey)

    return (
        <Chart config={config} data={data} dataKey={dataKey} layout='radial' {...props}>
            {({ onLegendSelect }) => (
                <RechartsPieChart
                    data={data}
                    margin={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                    }}
                    onClick={() => {
                        onLegendSelect(null)
                    }}
                    {...chartProps}
                >
                    {showLabel && variant === 'donut' && (
                        <text
                            className='fill-foreground font-semibold'
                            data-slot='label'
                            dominantBaseline='middle'
                            textAnchor='middle'
                            x='50%'
                            y='50%'
                        >
                            {parsedLabelInput}
                        </text>
                    )}

                    {!children ? (
                        <Pie
                            cx={pieProps?.cx ?? '50%'}
                            cy={pieProps?.cy ?? '50%'}
                            data={data}
                            dataKey={dataKey}
                            endAngle={pieProps?.endAngle ?? -270}
                            innerRadius={variant === 'donut' ? '50%' : '0%'}
                            isAnimationActive
                            name={nameKey}
                            startAngle={pieProps?.startAngle ?? 90}
                            strokeLinejoin='round'
                            {...pieProps}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    fill={getColorValue(
                                        config?.[data[index]?.code || data[index]?.name]?.color ??
                                            colors[index % colors.length],
                                    )}
                                    key={`cell-${index}`}
                                />
                            ))}
                        </Pie>
                    ) : (
                        children
                    )}

                    {tooltip && (
                        <ChartTooltip
                            content={
                                typeof tooltip === 'boolean' ? (
                                    <ChartTooltipContent
                                        accessibilityLayer
                                        hideLabel
                                        labelSeparator={false}
                                    />
                                ) : (
                                    tooltip
                                )
                            }
                            {...tooltipProps}
                        />
                    )}
                </RechartsPieChart>
            )}
        </Chart>
    )
}

export type { PieChartProps, BarChartProps, LineChartProps, AreaChartProps }
export { Chart, LineChart, AreaChart, PieChart, BarChart }
export { getColorValue, constructCategoryColors, DEFAULT_COLORS, CHART_COLORS }
