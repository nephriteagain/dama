
import { useRef, useEffect } from 'react'
import { CgCloseR } from 'react-icons/cg'

import '../sass/Rules.scss'



function Rules({ setOpenRules, openRules }) {

  const popupRef = useRef()

  function closeRuleSheet() {
    setOpenRules(false)
  }

  useEffect(() => {
    let x = 0
    let y = 0

    const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // Set the position of element
    popupRef.current.style.top = `${popupRef.current.offsetTop + dy}px`;
    popupRef.current.style.left = `${popupRef.current.offsetLeft + dx}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
    };

    const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

  popupRef.current.addEventListener('mousedown', mouseDownHandler);

  }, [openRules])

  return (
    <div className="rule-popup" 
      ref={popupRef}
    >
      <div className="rule-header">
        <h2>
        Filipino Checkers (Pinoy Dama)
        </h2>
        <h3>
        Rules of Play
        </h3>
      </div>
      <span className='close-rule'
        onClick={closeRuleSheet}
      >
        <CgCloseR />
      </span>
      <ol className="rule-lists" type="1">
        <li>
          Filipino checkers is played on the Dama Matrix or on the light squares only of a standard checkerboard of 64 alternating dark and light squares, (eight rows and eight files) by two opponents having 12 checkers each of contrasting colors, nominally referred to as black and white.
        </li>
        <br/>
        <li>
          The board is positioned squarely between the players and turned so that a dark square is at each player's near left side. Each player places his checkers on the light squares of the three rows nearest him. The player with the lighter checkers makes the first move of the game, and the players take turns thereafter, making one move at a time.
        </li>
        <br/>
        <li>
          The object of the game is to prevent the opponent from being able to move when it is his turn to do so. This is accomplished either by capturing all of the opponent's checkers, or by blocking those that remain so that none of them can be moved.
        </li>
        <br/>
        <li>
          Single checkers, known as men, move forward only, one square at a time in a diagonal direction, to an unoccupied square. Men capture by jumping over an opposing man on a diagonally adjacent square to the square immediately beyond, but may do so only if this square is unoccupied. Men may jump forward or backward, and may continue jumping as long as they encounter opposing checkers with unoccupied squares immediately beyond them. Men may never jump over checkers of the same color.
        </li>
        <br/>
        <li>
          A man who reaches the far side of the board becomes a king. If it reaches the far side by means of a jump, it continues jumping as a man on the same move, if possible, and remains a man at the end of the jumping sequence. He will be King only if the jumping sequence ends in the far side.
        </li>
        <br/>
        <li>
          Kings move forward or backward any number of squares on a diagonal line to an unoccupied square. Kings capture from any distance along a diagonal line by jumping, forward or backward, over an opposing man or king with at least one unoccupied square immediately beyond it. The capturing king then lands on any one of these unoccupied squares (except as noted in rule 7) and continues jumping, if possible, either on the same line or by making a right angle turn onto another diagonal line. Kings may never jump over checkers of the same color.
        </li>
        <br/>
        <li>
          Whenever a player is able to make a capture he must do so. When there is more than one way to jump, a player must choose the one which results in the capture of the greatest number of opposing units (it is obligatory). When a King or a man will both capture the same number of opposing units the player can choose which among them will capture. When a king jumps over an opposing man or king with more than one unoccupied square immediately beyond it, it must land on a square from which it is possible to continue jumping, if there is such a square. A player must make all the captures possible in a sequence. He may not leave one or more checkers uncaptured that he could capture simply by not continuing to jump. A "huff" of a checker for failure to jump properly is not permitted. The incorrect move must be retracted, and a correct move must be made. If possible, the correct move must be made with the man or king originally moved incorrectly.
        </li>
        <br/>
        <li>
          A man or King may not jump over the same opposing man or king more than once.
        </li>
        <br/>
        <li>
          Captured checkers are not removed from the board until all jumps made on the move are completed, and the hand is removed from the capturing man or king. (It is only in rare instances that rules 8 or 9 affect the play of a game. They can have the effect of reducing the number of captures possible on a move. In most of these cases a king is the capturing piece. On very rare occasions these rules, either separately or in combination, will result in a king being forced to terminate a series of jumps on a square from which it will then be captured by an opposing man or king which itself would have been captured were it not for these rules.)
        </li>
        <br/>
        <li>
          Whenever a situation arises in which one player has three kings and the other one king, no other checkers remaining on the board, a count is begun of the moves made by the weaker side (that is the lone King). If the lone king is not captured by the end of its twelfth move, the game is a draw. (In general, a win is possible only if the side with three kings has possession of the diagonal line running from the lower right corner to the upper left corner.) The players may also agree with each other for a draw.
        </li>
        <br/>
        <li>
          A player may resign.
        </li>
        <br/>
        <li>
          Time limits (optional). A player loses a game if his time expires.
        </li>
      </ol>
      <br/>
      <br/>
      <p className='perdigana-rule'>
        *** For Perdigana, the rules of winning are reversed, a player wins when all of the player's pieces are captured or all of the player's remaining pieces are blocked and unable to move. ***
      </p>
      <br/>
      <p className='source'>Rules was sourced <span>
        <a href='https://filipinocheckers.blogspot.com/2014/04/filipino-checkers-rules.html' target='_blank'>here.
        </a>
        </span>
      </p>
      
    </div>
  )
}

export default Rules