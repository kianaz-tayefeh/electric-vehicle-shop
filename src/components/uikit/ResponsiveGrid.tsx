const getGridClass = (columns: {
  base: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}) => {
  return `grid 
      grid-cols-${columns.base} 
      sm:grid-cols-${columns.sm ?? columns.base} 
      md:grid-cols-${columns.md ?? columns.base} 
      lg:grid-cols-${columns.lg ?? columns.base} 
      xl:grid-cols-${columns.xl ?? columns.base} 
      gap-4`
}

export const ResponsiveGrid = ({
  columns,
  children,
}: {
  columns: any
  children: React.ReactNode
}) => {
  return <div className={getGridClass(columns)}>{children}</div>
}
