import CardDashboard from "./components/CardDashboard"
import RadarChartDashboard from "./components/Graphics/RadarChart"
import AreaChartDashboard from "./components/Graphics/SimpleAreaChart"
import TinyBarChartHorizontal from "./components/Graphics/TinyBarDashboard"
import * as S from "./styles"

const DashboardPage = () => {
    return (
        <S.ContainerDashboard>
            <S.ContainerGraphics>
                <S.ContainerCards>
                    <CardDashboard>
                        <RadarChartDashboard/>
                    </CardDashboard>
                    <CardDashboard>
                        <TinyBarChartHorizontal/>
                    </CardDashboard>
                </S.ContainerCards>
                <AreaChartDashboard />
            </S.ContainerGraphics>
            <S.ContainerGithub>
                <CardDashboard />
            </S.ContainerGithub>
        </S.ContainerDashboard>
    )
}

export default DashboardPage