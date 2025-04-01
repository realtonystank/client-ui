import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1>Pizza app</h1>
      <Button
        style={{
          backgroundColor: "#000",
          color: "#fff",
          cursor: "pointer",
          padding: "5px 10px",
          borderRadius: "10px",
        }}
        variant={"link"}
      >
        Press here
      </Button>
    </>
  );
}
