import Navbar from "../common/Navbar";
import TransactionsView from "../views/transactions";

function Transactions() {

  return (
    <div id='home'>
      <Navbar />
      <TransactionsView />
    </div>
  );
}

export default Transactions;