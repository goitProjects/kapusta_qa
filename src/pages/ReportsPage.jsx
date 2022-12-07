import moment from 'moment';
import { useEffect, useState } from 'react';
import { getDataForPeriod } from '../services/reportsApi';
import expensesCategories from '../data/expensesReports.json';
import ReportsHeader from '../components/ReportsHeader/ReportsHeader';
import ReportsTotal from 'components/ReportsTotal/ReportsTotal';
import ReportsCategories from 'components/ReportsCategories/ReportsCategories';
import Diagram from 'components/Diagram/Diagram';
import Loader from 'components/Loader/Loader';
import { getEmailUser } from 'redux/auth/AuthSelector';
import { useSelector } from 'react-redux';

const ReportsPage = () => {
  const email = useSelector(getEmailUser);
  const [month, setMonth] = useState(0);
  const [type, setType] = useState('expenses');
  const [category, setCategory] = useState('');
  const [userExpenses, setUserExpenses] = useState(null);
  const [userIncome, setUserIncome] = useState(null);
  const [keysDiagram, setKeysDiagram] = useState(null);
  const [valuesDiagram, setValuesDiagram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const dateFormatStr = moment().add(month, 'month').format('YYYY-MM');
    if (email) {
      setError('');
      setLoading(true);
      getDataForPeriod(dateFormatStr)
        .then(data => {
          setUserExpenses(data.expenses);
          setUserIncome(data.incomes);
        })
        .catch(error => {
          setError(error.message);
          setUserExpenses(null);
          setUserIncome(null);
        })
        .finally(() => setLoading(false));
    }
  }, [month, email]);

  const onCategoryChange = (value, transactions) => {
    setCategory(value);
    const arrayOfKeys = Object.keys(transactions[value]);
    arrayOfKeys.splice(0, 1);
    const arrayOfValues = Object.values(transactions[value]);
    arrayOfValues.splice(0, 1);
    setKeysDiagram(arrayOfKeys);
    setValuesDiagram(arrayOfValues);
  };

  return (
    <>
      <ReportsHeader setMonth={setMonth} month={month} setCategory={setCategory} />
      {userExpenses && userIncome && error === '' && (
        <>
          <ReportsTotal userExpenses={userExpenses} userIncome={userIncome} />
          <ReportsCategories
            category={category}
            setCategory={setCategory}
            userExpenses={userExpenses}
            userIncome={userIncome}
            onCategoryChange={onCategoryChange}
            type={type}
            setType={setType}
          />
        </>
      )}
      {category && keysDiagram && valuesDiagram && error === '' && (
        <Diagram
          keysDiagram={keysDiagram}
          valuesDiagram={valuesDiagram}
          category={type === 'expenses' ? expensesCategories[category].title : category}
        />
      )}
      {loading && <Loader />}
      {error && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '600',
            marginTop: '40px',
          }}
        >
          {error}
        </p>
      )}
    </>
  );
};
export default ReportsPage;
