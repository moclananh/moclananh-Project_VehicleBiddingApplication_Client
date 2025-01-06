import { defaultTo, toNumber } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { CarDetails } from "../features/car-bidding/components/car-details/CarDetails";
import { useVehiclesDetails } from "../features/car-bidding/hooks/useVehicle";
import { Container } from "@mantine/core";
const CarDetailsPage = () => {
  const { carId } = useParams();
  const { data: queryData } = useVehiclesDetails(toNumber(carId));
  const vehicle = defaultTo(queryData?.data, null);
  const navigate = useNavigate();
  if (!vehicle) return <div>Car not found</div>;

  return (
    <Container>
      <CarDetails
        car={vehicle}
        onBack={() => {
          navigate(-1);
        }}
      />
    </Container>
  );
};

export default CarDetailsPage;
