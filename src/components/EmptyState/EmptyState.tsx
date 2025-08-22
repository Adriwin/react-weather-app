import './EmptyState.css';

export const EmptyState = () => {
  return (
    <>
      <div className="text-center fadeing-text">
        <p>
          Please provide a city/place to check the weather or wait for data
          loading...
        </p>
      </div>
    </>
  );
};
