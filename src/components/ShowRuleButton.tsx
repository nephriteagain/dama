import '../sass/Gameboard.scss'

interface ShowRuleButtonProps {
  showRules: () => void
}

function ShowRuleButton({showRules} : ShowRuleButtonProps) {
  return (
    <div className="show-rules">
        <button className="btn-show-rules" onClick={showRules}>
          Show Rules
        </button>
    </div>
  )
}

export default ShowRuleButton