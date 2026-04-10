import { config as pie } from './pie-borderRadius'
import { config as bar } from './bar'
import { config as barStack } from './bar-stack'
import { config as graph } from './graph-force'
import { config as curve } from './historical-curve'
import { config as mix } from './mix-line-bar'
import { config as gauge } from './gauge-grade'

export default `# 图表-并排
<div class="md-flex">

 \`\`\`echarts
${JSON.stringify(pie)}
\`\`\` 

\`\`\`echarts
${JSON.stringify(pie)}
\`\`\`

</div>

<hr>

<div class="md-flex">

 \`\`\`echarts
${JSON.stringify(graph)}
\`\`\` 

\`\`\`echarts
${JSON.stringify(bar)}
\`\`\`

</div>

<hr>

<div class="md-flex">

 \`\`\`echarts
${JSON.stringify(curve)}
\`\`\` 

\`\`\`echarts
${JSON.stringify(mix)}
\`\`\`

</div>

<hr>

<div class="md-flex">

 \`\`\`echarts
${JSON.stringify(gauge)}
\`\`\` 

\`\`\`echarts
${JSON.stringify(gauge)}
\`\`\`

</div>

<hr>

<div class="md-flex">

\`\`\`echarts
${JSON.stringify(bar)}
\`\`\`

\`\`\`echarts
${JSON.stringify(barStack)}
\`\`\`

\`\`\`echarts
${JSON.stringify(mix)}
\`\`\`

</div>
`
