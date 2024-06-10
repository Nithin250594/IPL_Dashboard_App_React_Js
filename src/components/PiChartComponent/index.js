import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'

const PieChartComponent = props => {
  const {statistics} = props

  const COLORS = ['#18ed66', '#e31a1a']

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={statistics}
        dataKey={statistics.name}
        nameKey={statistics.value}
        cx={200}
        cy={200}
        labelLine={false}
        label
        outerRadius={80}
        innerRadius={30}
        fill="#8884d8"
      >
        {statistics.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export default PieChartComponent
