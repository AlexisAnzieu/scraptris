"use client";

import { Button, Container, Box } from "@chakra-ui/react";

import useSWR from "swr";
import "chart.js/auto";

import { Chart } from "react-chartjs-2";
import { Properties } from "../components/MapComponent";

const fetcher = (args: any) => fetch(args).then((res) => res.json());

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export default function Home({
  params: { mlsnumber },
}: {
  params: { mlsnumber: string };
}) {
  const { data: property, isLoading } = useSWR<Properties>(
    `api/properties?mlsNumber=${mlsnumber}`,
    fetcher
  );

  return (
    <Container pt={10} textAlign={"center"}>
      <Box p={3}>
        <a
          href={`https://www.centris.ca/en/houses~for-sale~plaisance/${25581849}?uc=0`}
          target="_blank"
        >
          <Button>Voir l'annonce sur centris</Button>
        </a>
      </Box>{" "}
      Ajoutée le{" "}
      {new Date(property?.createdAt).toLocaleDateString("fr", dateOptions)}
      {!isLoading && (
        <>
          <img src={property?.picture} />
          <Chart
            width={"100%"}
            type="line"
            data={{
              labels: property?.prices.map((p) =>
                new Date(p.createdAt).toLocaleDateString("fr", dateOptions)
              ),
              datasets: [
                {
                  backgroundColor: "#dd6b20",
                  fill: true,
                  borderColor: "#dd6b20",
                  label: "Prix",
                  data: property?.prices?.map((p) => p.amount),
                },
              ],
            }}
          />
        </>
      )}
    </Container>
  );
}
