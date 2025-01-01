import { IconCertificate, IconCoin, IconTruck } from "@tabler/icons-react";
import { Container, SimpleGrid, Text } from "@mantine/core";
import classes from "./FeatureSection.module.css";

interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: "Nationwide Delivery",
    description: "Get your dream car delivered to your doorstep with our reliable and fast nationwide delivery service.",
  },
  {
    icon: IconCertificate,
    title: "Verified Listings",
    description: "Bid with confidence on verified vehicles, ensuring transparency and quality in every deal.",
  },
  {
    icon: IconCoin,
    title: "Competitive Pricing",
    description: "Enjoy competitive bidding with clear pricing to ensure you get the best deal on every car.",
  },
];

export function FeaturesAsymmetrical() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
