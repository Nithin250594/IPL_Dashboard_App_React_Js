// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChartComponent from '../PiChartComponent'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatches: {},
    latestMatch: {},
    recentMatchesList: [],
    eachTeamId: '',
    statistics: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const eachTeamDetails = await response.json()

    const teamMatchDetails = {
      teamBannerUrl: eachTeamDetails.team_banner_url,
      latestMatchDetails: eachTeamDetails.latest_match_details,
      recentMatches: eachTeamDetails.recent_matches,
    }

    const latestMatchSection = {
      umpires: teamMatchDetails.latestMatchDetails.umpires,
      result: teamMatchDetails.latestMatchDetails.result,
      manOfTheMatch: teamMatchDetails.latestMatchDetails.man_of_the_match,
      id: teamMatchDetails.latestMatchDetails.id,
      date: teamMatchDetails.latestMatchDetails.date,
      venue: teamMatchDetails.latestMatchDetails.venue,
      competingTeam: teamMatchDetails.latestMatchDetails.competing_team,
      competingTeamLogo:
        teamMatchDetails.latestMatchDetails.competing_team_logo,
      firstInnings: teamMatchDetails.latestMatchDetails.first_innings,
      secondInnings: teamMatchDetails.latestMatchDetails.second_innings,
      matchStatus: teamMatchDetails.latestMatchDetails.match_status,
    }

    const recentMatchesBox = teamMatchDetails.recentMatches.map(eachMatch => ({
      competingTeamLogo: eachMatch.competing_team_logo,
      competingTeam: eachMatch.competing_team,
      result: eachMatch.result,
      matchStatus: eachMatch.match_status,
      id: eachMatch.id,
    }))

    const matchResult = teamMatchDetails.recentMatches.reduce(
      (acc, eachMatch) => {
        if (eachMatch.match_status === 'Won') {
          acc.Won = (acc.Won || 0) + 1
        } else if (eachMatch.match_status === 'Lost') {
          acc.Lost = (acc.Lost || 0) + 1
        } else acc.Drawn = (acc.Drawn || 0) + 1
        return acc
      },
      {},
    )

    const TeamChartResult = [
      {name: 'Won', value: matchResult.Won},
      {name: 'Lost', value: matchResult.Lost},
      {name: 'Drawn', value: matchResult.Drawn},
    ]

    this.setState({
      teamMatches: teamMatchDetails,
      latestMatch: latestMatchSection,
      recentMatchesList: recentMatchesBox,
      eachTeamId: id,
      isLoading: false,
      statistics: TeamChartResult,
    })
  }

  onClickBackButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {
      teamMatches,
      latestMatch,
      recentMatchesList,
      eachTeamId,
      isLoading,
      statistics,
    } = this.state
    const {teamBannerUrl} = teamMatches

    return (
      <div className={`team-matches-bg ${eachTeamId}`}>
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt="team banners"
              className="team-banner-image"
            />
            <p className="latest-matches-title">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatch} />
            <PieChartComponent statistics={statistics} />
            <ul className="match-card-matches-list">
              {recentMatchesList.map(eachRecentMatch => (
                <MatchCard
                  key={eachRecentMatch.id}
                  eachRecentMatchBox={eachRecentMatch}
                />
              ))}
            </ul>
          </>
        )}
        <button
          type="button"
          className="back-button"
          onClick={this.onClickBackButton}
        >
          Back
        </button>
      </div>
    )
  }
}

export default TeamMatches
