// import { Container, Row, Col } from "react-bootstrap";
// import ResetForm from "./style";
// import { Link } from "~components";

export default function Hero() {
  return (
    <div className="bg-gray-100">
      <div className="static">
        <div className="flex static items-center justify-center">
          <div className="w-full sm:w-1/2 static ">
            <div
              className="h-full w-full"
              style={{ backgroundImage: "url('/scale-1.jpeg')" }}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <div className="pl-16">Something</div>
          </div>
        </div>
      </div>
    </div>
  );
}
