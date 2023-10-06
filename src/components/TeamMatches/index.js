// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatches: {},
    latestMatch: {},
    recentMatchesList: [],
    eachTeamId: '',
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

    this.setState({
      teamMatches: teamMatchDetails,
      latestMatch: latestMatchSection,
      recentMatchesList: recentMatchesBox,
      eachTeamId: id,
      isLoading: false,
    })
  }

  render() {
    const {
      teamMatches,
      latestMatch,
      recentMatchesList,
      eachTeamId,
      isLoading,
    } = this.state
    const {teamBannerUrl} = teamMatches

    return (
      <div className={`team-matches-bg ${eachTeamId}`}>
        {isLoading ? (
          <div testid="loader">
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
      </div>
    )
  }
}

export default TeamMatches
