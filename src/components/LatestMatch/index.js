// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props

  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <div className="match-card-bg">
      <div className="latest-match-left-section">
        <p className="competing-team-title">{competingTeam}</p>
        <p className="date-text">{date}</p>
        <p className="venue-similar-text">{venue}</p>
        <p className="venue-similar-text">{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="competing-team-logo"
      />
      <div className="latest-match-right-section">
        <p className="venue-similar-text">First Innings</p>
        <p className="span-sub-text">{firstInnings}</p>
        <p className="venue-similar-text">Second Innings</p>
        <p className="span-sub-text">{secondInnings}</p>
        <p className="man-of-match-text">Man Of The Match</p>
        <p className="span-sub-text">{manOfTheMatch}</p>
        <p className="venue-similar-text">Umpires</p>
        <p className="span-sub-text">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
