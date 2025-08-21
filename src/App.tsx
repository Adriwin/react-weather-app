import appIcon from "/app-icon.png"

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h2 className="text-black bg-gradient-to-r from-red-300 to-pink-400 rounded-lg p-2">Soon to be the best weather app</h2>
        <img src={appIcon} className="my-10 w-20 h-20" />
      </div>

      <div className="fit-content bg-gray-200 rounded-lg p-4 animate-bounce bg-gradient-to-r from-green-400 to-blue-500">
        <p className="font-bold text-white">Lucy is still working on the UI</p>
      </div>
    </div>
  );
}

export default App;
