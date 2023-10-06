// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachRecentMatchBox} = props

  const {
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = eachRecentMatchBox

  const winOrLose = matchStatus === 'Won' ? 'win-status' : 'lose-status'

  return (
    <li className="recent-match-card-bg">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo-match-card-section"
      />
      <p className="match-card-team-title">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={`match-card-status ${winOrLose}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
