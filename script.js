const welcomePage = document.getElementById("welcome__page");
const winPage = document.getElementById("win__page");
const fieldPage = document.getElementById("field__page");
const scorePage = document.getElementById("score__page");
const winner = document.getElementById("winner");
const field = document.getElementById("field");
const turn = document.getElementById("turn");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const oCounter = document.getElementById("oCounter");
const xCounter = document.getElementById("xCounter");

class App {
  activePlayer = 0;
  gamesField = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  winsOfO = 0;
  winsOfX = 0;

  constructor() {
    startBtn.addEventListener("click", this._toGameScreen);
    restartBtn.addEventListener("click", this._restartGame.bind(this));
    field.addEventListener("click", this._catchPlayersTurn.bind(this));
  }

  _toGameScreen() {
    welcomePage.style.display = "none";
    fieldPage.style.display = "flex";
    scorePage.style.display = "flex";
  }

  _catchPlayersTurn(e) {
    const clicked = e.target.closest("th");
    if (clicked.textContent == "") {
      clicked.textContent = this.activePlayer === 0 ? "x" : "о";
      this.activePlayer === 0
        ? this.gamesField.splice(clicked.id, 1, "X")
        : this.gamesField.splice(clicked.id, 1, "O");
      this._checkDraw();
      this._checkWinner();
      this.activePlayer = this.activePlayer === 0 ? 1 : 0;
      turn.textContent =
        this.activePlayer == 0 ? "Turn of the crosses" : "Turn of the noughts";
    }
  }
  _checkDraw() {
    if (this.gamesField.every((el) => typeof el == "string")) {
      winner.textContent = "Friendship won ;)";
      winPage.style.display = "flex";
      scorePage.style.display = "none";
    }
  }
  _checkWinner() {
    if (
      (this.gamesField[0] == this.gamesField[1] &&
        this.gamesField[0] == this.gamesField[2]) ||
      (this.gamesField[0] == this.gamesField[3] &&
        this.gamesField[0] == this.gamesField[6]) ||
      (this.gamesField[0] == this.gamesField[4] &&
        this.gamesField[0] == this.gamesField[8]) ||
      (this.gamesField[3] == this.gamesField[4] &&
        this.gamesField[3] == this.gamesField[5]) ||
      (this.gamesField[6] == this.gamesField[7] &&
        this.gamesField[6] == this.gamesField[8]) ||
      (this.gamesField[1] == this.gamesField[4] &&
        this.gamesField[1] == this.gamesField[7]) ||
      (this.gamesField[2] == this.gamesField[5] &&
        this.gamesField[2] == this.gamesField[8]) ||
      (this.gamesField[2] == this.gamesField[4] &&
        this.gamesField[2] == this.gamesField[6])
    ) {
      field.style.pointerEvents = "none";
      winner.textContent =
        this.activePlayer == 0 ? "Crosses won" : "Noughts won";
      this.activePlayer == 0 ? (this.winsOfX += 1) : (this.winsOfO += 1);
      oCounter.textContent = this.winsOfO;
      xCounter.textContent = this.winsOfX;
      winPage.style.display = "flex";
      scorePage.style.display = "none";
    }
  }
  _restartGame() {
    field.style.pointerEvents = "all";
    document.querySelectorAll("th").forEach((cell) => (cell.textContent = ""));
    this.activePlayer = 0;
    this.gamesField = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    winPage.style.display = "none";
    scorePage.style.display = "flex";
  }
}

const app = new App();
