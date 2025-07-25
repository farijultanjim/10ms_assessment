interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="container py-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center sm:text-5xl md:text-6xl text-gradient">
        {title}
      </h1>
      <p className="mt-2 text-center text-sm text-gray-300">
        Course Instructor: Munzereen Shahid
      </p>
    </div>
  );
}
