export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Event Page {params.id}</h1>
    </div>
  );
}
