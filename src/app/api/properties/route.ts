import { Properties } from "@/types/Properties";
import { PrismaClient } from "@prisma/client";
import currency from "currency.js";
const prisma = new PrismaClient();

const PRICE_BUCKET = [
    {
        min: 450000,
        max: 500000,
    },
    {
        min: 500000,
        max: 600000,
    },
    {
        min: 600000,
        max: 650000,
    },
];

const fetchMLS = async (
    page = 1,
    priceBucket: { min: number; max: number }
): Promise<Properties> => {
    return fetch("https://api2.realtor.ca/Listing.svc/PropertySearch_Post", {
        headers: {
            accept: "*/*",
            "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
                '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: "ASP.NET_SessionId=5cwjoiqyj3x2bqmsgg52jpmk; gig_bootstrap_3_mrQiIl6ov44s2X3j6NGWVZ9SDDtplqV7WgdcyEpGYnYxl7ygDWPQHqQqtpSiUfko=gigya-pr_ver4; visid_incap_2269415=HQycsF1STn2KQbqEwOejSJDlSmQAAAAAQUIPAAAAAAAWavWGjPT/Z8AUCHoF2kGw; nlbi_2269415=4YvCH7jhX3DKT1Yo+/Ys1gAAAADfiEugc77KWYc3BsryFrVs; incap_ses_628_2269415=JnSZV1QXJHDw7pF3EBu3CJDlSmQAAAAAQGkNtBMEbnJ2J1xGv0BcnQ==; incap_ses_1227_2269415=gBr6bx1b8EFNAzh1wy4HEZvlSmQAAAAARtKA+P5D8Bvug0DS/6CSnQ==; incap_ses_1293_2269415=Fha/Djl8JgN4oGYQTqnxEVLoSmQAAAAAF/gq877Lqr+dStTED1sV7A==; visid_incap_2271082=AWc6/xzeSmirD/hhndKhp2DoSmQAAAAAQUIPAAAAAACAC5gkCiHAclClt0KENfGj; nlbi_2271082=AHA/FD5L7Ut+No5ZVPrQ3QAAAADYwVUWID9VPfdIVhPV7fLf; incap_ses_1293_2271082=9TwFHa0zFQM7smYQTqnxEWDoSmQAAAAA7OcZGv8tCT5zBjQP8NvlmQ==; reese84=3:N/ElzTi4HHMm5TUdbB/Tog==:FQSyhjUs1f/evrU+f810NUGy+Lb6iGFy3n77bqBoF/UGm4z79j/VGq3F3EvtlHzXOYybV4lU3IPCL7RF/D8KI152ILGPvP+1vjXWLkQ6soDcr5oQskMMpGgOBWPMVKUrLvMWYMGFr1r7olh1exsQVbRvuyM+R9Qu+hC5ztUu6SVliEZJE7kLARqDhhRJJCj8Ca/jcCe7LHdkCzB6pYfnzhN5t9Rcjlpkx81X90e3TQcYWkyP6pK44t+IxsoW3TI9zqZkUGXFLMlpsu7+g3LCCvVJqXMPpo/W2i0KNdu7UYhgd+bG8yOaLy1bbQypfvuhoQ29Up1o6bvyIjftXGpQeBEnrduR/cm4v30gGMATOpO7aPfwglaRvHgHp30EHF9SdPiAAGysKFS2xxyR89P2+mDRfaB0nAKtb/LTnovr3sPwow25kXJUvMJrhnK7kLVtHUoWk97kwC2zyDwruexu/kw4PK0oWU0rrVdw1MjhFQE=:O8HdMI+GArWp1ONIOi+GFnWbBNKrfQ0oVRBrM3LKDAc=; nlbi_2269415_2147483392=E+y+TpMPqQlpATWU+/Ys1gAAAACC8yjnxMu2M0uhjyDY6VMS; incap_ses_628_2271082=/TjCck6VMGQXXZZ3EBu3CBTpSmQAAAAAy7GMlyS7eTfWUYHk4tAnFw==; nlbi_2271082_2147483392=LoAFVZfSEgK9qsWjVPrQ3QAAAACaql3VrSh6b9GejPRQuZ5+",
            Referer: "https://www.realtor.ca/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `ZoomLevel=14&LatitudeMax=45.55318&LongitudeMax=-73.53407&LatitudeMin=45.50333&LongitudeMin=-73.63354&Sort=6-D&PropertyTypeGroupID=1&PropertySearchTypeId=0&TransactionTypeId=2&PriceMin=${priceBucket.min}&PriceMax=${priceBucket.max}&BedRange=1-0&Currency=CAD&RecordsPerPage=80&ApplicationId=1&CultureId=2&Version=7.0&CurrentPage=${page}`,
        method: "POST",
    }).then((res) => res.json());
};

export async function GET() {
    const allProperties = [];
    for (const bucket of PRICE_BUCKET) {
        const totalPage = await fetchMLS(1, bucket).then(
            (res) => res.Paging.TotalPages
        );

        for (let page = 1; page <= totalPage; page++) {
            const properties = await fetchMLS(page, bucket);
            const data = properties!.Results!.map((item: any) => ({
                id: item.Id,
                MlsNumber: item.MlsNumber,
                price: item.Property.Price,
                address: item.Property.Address.AddressText,
                city: item.Property.Address.City,
                province: item.Property.Address.Province,
                postalCode: item.Property.Address.PostalCode,
                latitude: item.Property.Address.Latitude,
                longitude: item.Property.Address.Longitude,
                bedrooms: item.Building.Bedrooms,
                type: item.Building.Type,
                centrisUrl: `https://www.centris.ca/fr/eeee/${item.MlsNumber}`,
                image: item.Property.Photo[0].HighResPath,
            }));
            allProperties.push(...data);
        }
    }

    return new Response(
        await Promise.allSettled(
            allProperties.map((property: any) => {
                return prisma.property.upsert({
                    where: {
                        MlsNumber: property.MlsNumber,
                    },
                    create: {
                        longitude: +property.longitude,
                        latitude: +property.latitude,
                        MlsNumber: property.MlsNumber,
                        picture: property.image,
                        prices: {
                            create: {
                                amount: currency(property.price).value,
                            },
                        },
                    },
                    update: {
                        prices: {
                            create: {
                                amount: currency(property.price).value,
                            },
                        },
                    },
                });
            })
        ).then((res) => JSON.stringify(res))
    );
}
