const Loading = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-4 h-4 bg-[#2C2A4A] rounded-full"></div>
          <div className="w-4 h-4 bg-[#2C2A4A] rounded-full"></div>
          <div className="w-4 h-4 bg-[#2C2A4A] rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  