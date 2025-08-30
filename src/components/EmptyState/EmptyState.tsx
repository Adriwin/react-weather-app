import './EmptyState.scss';

export const EmptyState = () => {
  return (
    <>
      <div className="fadeing-text text-center">
        <p>
          Please provide a city/place to check the weather or wait for data
          loading...
        </p>
      </div>
    </>
  );
};
