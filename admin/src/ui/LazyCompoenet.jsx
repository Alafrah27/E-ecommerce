const AnimatedCircle = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <svg className="rotating-svg" viewBox="25 25 50 50">
        <circle className="dashed-circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default AnimatedCircle;
