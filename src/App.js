import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import './App.css';
import { GET_ALL_WORKERS, GET_WORKER } from './query/worker';

function App() {
  const [workers, setWorkers] = useState([]);
  const [workerId, setWorkerId] = useState('');
  const [worker, setWorker] = useState(null);
  const { data, loading, error, refetch } = useQuery(GET_ALL_WORKERS, {
    pollInterval: 1000,
  });
  const { data: workerOne, loading: workerLoading } = useQuery(GET_WORKER, {
    variables: {
      id: workerId ? +workerId : null,
    },
  });
  useEffect(() => {
    if(!loading) {
      setWorkers(data.getAllWorkers);
    }
  }, [data, loading, workerLoading, workerOne]);
  const handleChange = (event) => {
    const { value } = event.target;
    setWorkerId(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!workerId.length) {
      return;
    }
    if(!workerLoading) {
      setWorker(workerOne.getWorker);
    }
  }

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          type="text"
          value={workerId}
        />
        <button
          type="submit"
        >
          Find worker
        </button>
      </form>
      {worker && (
        <div>
          {worker.firstName}
        </div>
      )}
      <div className="WorkersContainer">
        {workers.map(worker => (
          <div key={worker.id}>
            <p>{worker.firstName}</p>
            <p>{worker.lastName}</p>
            <p>{worker.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
