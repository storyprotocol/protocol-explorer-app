function PlaceholderParagraph() {
  return (
    <p className="text-left max-w-xl px-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec magna purus,
      lacinia vel hendrerit vitae, vulputate suscipit leo. Donec sed tincidunt libero. Sed cursus euismod purus, id
      tempus tellus malesuada at. Nulla facilisi. Duis sed eros mollis, tincidunt nibh sit amet, ultricies sapien.
      Pellentesque orci quis hendrerit et cursus. Maecenas lacinia velit vitae est finibus, vitae dictum neque
      hendrerit. Aenean ac eleifend enim. Pellentesque pellentesque erat vel ipsum ultrices, at tempus neque suscipit.
      Pellentesque auctor nisl ut lectus sagittis, vel elementum ligula egestas. Vivamus at hendrerit metus. In
      condimentum massa id nisi aliquet, nec vulputate turpis ultrices. Nullam at libero ultrices, ultrices sapien ac,
      iaculis urna. Nulla venenatis, nisl scelerisque sollicitudin fermentum, neque elit posuere turpis, id mollis eros
      orci vitae felis.
    </p>
  );
}

export default function Page() {
  return (
    <div className="container h-screen text-center">
      <h1 className="text-4xl py-10">Terms of Service</h1>
      <div className="flex flex-col items-center gap-4 ">
        <PlaceholderParagraph />
        <PlaceholderParagraph />
        <PlaceholderParagraph />
        <PlaceholderParagraph />
      </div>
    </div>
  );
}
