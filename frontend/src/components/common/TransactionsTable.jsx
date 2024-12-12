
const TableRowItem = ({ value, shorten }) => (
    <td className="px-4 py-8 text-[#cad0d7] text-left">
      {!shorten ? value : `${value.substring(0, 18)}...`}
    </td>
  );

  const TableHeaderItem = ({ value }) => (
    <th className="px-4 py-4 uppercase text-[#cad0d7] text-left">
      {value}
    </th>
  );

  
 export  default function  TransactionTable ({transactions}){
    const TableHeaders = [
      'Hash',
      'Amount',
      'Sender',
      'To',
      'Block Height',
    ];
  

    if(transactions.length === 0){
      return <></>
    };

  
    return (
      <div>
      <table className="table-auto w-full">
        <thead className="bg-[#1e2836]" >
          <tr>
            {TableHeaders.map((header, index) => (
              <TableHeaderItem key={index} value={header} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#0f1626]"  >
          {transactions.map((transaction, index) => (
            <tr key={index}  
            style={{ 
              borderBottomColor: "red", 
              borderBottomWidth: "2px",
              borderBottom: "2px solid #808494"
               }} >
              <TableRowItem value={transaction.hash} shorten />
              <TableRowItem value={transaction.amount} />
              <TableRowItem value={transaction.sender} shorten />
              <TableRowItem value={transaction.to} shorten />
              <TableRowItem value={transaction.blockHeight} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }