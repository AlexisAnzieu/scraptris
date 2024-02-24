"use client";
import { Button, Container, Heading, Input, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [mlsNumber, setMlsNumber] = useState("");
  const router = useRouter();

  return (
    <Container pt={10} textAlign={"center"}>
      <Heading pb={5} size="lg">
        Entrer le numéro centris
      </Heading>
      <Input
        onChange={(e) => setMlsNumber(e.target.value)}
        defaultValue={mlsNumber}
        textAlign={"center"}
        placeholder="12910827"
        size="lg"
      />

      <Box pt={5}>
        <Button onClick={() => router.push(`/${mlsNumber}`)} size={"lg"}>
          Chercher
        </Button>
      </Box>

      <Box pt={10}>
        <Button
          colorScheme="facebook"
          onClick={() => router.push("/map")}
          size={"lg"}
        >
          Voir la carte
        </Button>
      </Box>
    </Container>
  );
}
