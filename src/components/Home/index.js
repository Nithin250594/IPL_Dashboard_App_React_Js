import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {iplTeamsList: [], isLoading: true}

  componentDidMount() {
    this.getIplTeamsData()
  }

  getIplTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const iplData = await response.json()
    const {teams} = iplData
    const modifiedIplTeamsList = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({iplTeamsList: modifiedIplTeamsList, isLoading: false})
  }

  render() {
    const {iplTeamsList, isLoading} = this.state

    return (
      <div className="ipl-dashboard-bg">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="ipl-dashboard-header">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-logo"
              />
              <h1 className="ipl-dashbord-title">IPL Dashboard</h1>
            </div>
            <ul className="ipl-teams-list">
              {iplTeamsList.map(eachTeam => (
                <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
