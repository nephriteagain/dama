import '../sass/Gameboard.scss'

function ShowRuleButton({showRules}) {
  return (
    <div className="show-rules">
        <button className="btn-show-rules" onClick={showRules}>
          Show Rules
        </button>
    </div>
  )
}

export default ShowRuleButton