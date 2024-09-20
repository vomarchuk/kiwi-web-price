// src/home/services/[...slug].tsx

import { useRouter } from 'next/router';

const ServicePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Dynamic Route</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default ServicePage;
