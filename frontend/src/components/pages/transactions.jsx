import Navbar from "../common/Navbar";
import TransactionsView from "../views/transactions";
import Footer from "../views/footer";

function Transactions() {

  return (
    <div id='home'>
      <Navbar />
      <TransactionsView />
      <Footer />
    </div>
  );
}

export default Transactions;