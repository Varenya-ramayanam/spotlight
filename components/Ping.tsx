const Ping = () => {
    return (
      <div className="relative">
        <span className="absolute -right-36 -top-7 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-600"></span>
        </span>
      </div>
    );
  };
  
  export default Ping;
  