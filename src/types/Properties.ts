export interface Properties {
    ErrorCode: ErrorCode;
    Paging: Paging;
    Results?: ResultsEntity[] | null;
    Pins?: PinsEntity[] | null;
    GroupingLevel: string;
}
export interface ErrorCode {
    Id: number;
    Description: string;
    Status: string;
    ProductName: string;
    Version: string;
}
export interface Paging {
    RecordsPerPage: number;
    CurrentPage: number;
    TotalRecords: number;
    MaxRecords: number;
    TotalPages: number;
    RecordsShowing: number;
    Pins: number;
}
export interface ResultsEntity {
    Id: string;
    MlsNumber: string;
    PublicRemarks: string;
    Building: Building;
    Individual?: IndividualEntity[] | null;
    Property: Property;
    Business: BusinessOrLand;
    Land: Land;
    PostalCode: string;
    ProvinceName: string;
    RelativeDetailsURL: string;
    StatusId: string;
    PhotoChangeDateUTC: string;
    HasNewImageUpdate?: boolean | null;
    Distance: string;
    RelativeURLEn: string;
    RelativeURLFr: string;
    Media?: (MediaEntity | null)[] | null;
    InsertedDateUTC: string;
    TimeOnRealtor: string;
    Tags?: TagsEntity[] | null;
    AlternateURL?: AlternateURL | null;
    OpenHouse?: OpenHouseEntity[] | null;
    OpenHouseInsertDateUTC?: string | null;
    HasOpenHouseUpdate?: boolean | null;
    ListingTimeZone?: string | null;
    ListingBoundary?: string | null;
    ListingGMT?: string | null;
    PriceChangeDateUTC?: string | null;
    HasPriceUpdate?: boolean | null;
}
export interface Building {
    BathroomTotal: string;
    Bedrooms: string;
    SizeInterior?: string | null;
    StoriesTotal: string;
    Type: string;
    SizeExterior?: string | null;
    UnitTotal?: string | null;
}
export interface IndividualEntity {
    IndividualID: number;
    Name: string;
    Organization: Organization;
    Phones?: PhonesEntity[] | null;
    Websites?: WebsitesEntity[] | null;
    Emails?: EmailsEntity[] | null;
    Photo: string;
    Position: string;
    PermitFreetextEmail: boolean;
    FirstName: string;
    LastName: string;
    CorporationDisplayTypeId: string;
    PermitShowListingLink: boolean;
    RelativeDetailsURL: string;
    AgentPhotoLastUpdated: string;
    PhotoHighRes: string;
    RankMyAgentKey: string;
    RealSatisfiedKey: string;
    CorporationName?: string | null;
    CorporationType?: string | null;
    CccMember?: boolean | null;
}
export interface Organization {
    OrganizationID: number;
    Name: string;
    Logo: string;
    Address: Address;
    Phones?: PhonesEntity[] | null;
    Emails?: EmailsEntity[] | null;
    Websites?: WebsitesEntity[] | null;
    OrganizationType: string;
    Designation: string;
    HasEmail: boolean;
    PermitFreetextEmail: boolean;
    PermitShowListingLink: boolean;
    RelativeDetailsURL: string;
    PhotoLastupdate: string;
}
export interface Address {
    AddressText: string;
    PermitShowAddress: boolean;
    DisseminationArea?: null;
}
export interface PhonesEntity {
    PhoneType: string;
    PhoneNumber: string;
    AreaCode: string;
    PhoneTypeId: string;
}
export interface EmailsEntity {
    ContactId: string;
}
export interface WebsitesEntity {
    Website: string;
    WebsiteTypeId: string;
}
export interface Property {
    Price: string;
    Type: string;
    Address: Address1;
    Photo?: PhotoEntity[] | null;
    TypeId: string;
    FarmType: string;
    OwnershipType?: string | null;
    ZoningType?: string | null;
    AmmenitiesNearBy?: string | null;
    ConvertedPrice: string;
    OwnershipTypeGroupIds?: number[] | null;
    PriceUnformattedValue: string;
    Parking?: ParkingEntity[] | null;
    ParkingSpaceTotal?: string | null;
    ParkingType?: string | null;
    LeaseRent?: string | null;
    LeaseRentUnformattedValue?: string | null;
}
export interface Address1 {
    AddressText: string;
    Longitude: string;
    Latitude: string;
    PermitShowAddress: boolean;
    DisseminationArea?: null;
}
export interface PhotoEntity {
    SequenceId: string;
    HighResPath: string;
    MedResPath: string;
    LowResPath: string;
    Description: string;
    LastUpdated: string;
}
export interface ParkingEntity {
    Name: string;
}
export interface BusinessOrLand {}
export interface Land {
    SizeTotal?: string | null;
    SizeFrontage?: string | null;
}
export interface MediaEntity {
    MediaCategoryId: string;
    MediaCategoryURL: string;
    Description: string;
    Order: number;
}
export interface TagsEntity {
    Label: string;
    HTMLColorCode: string;
    ListingTagTypeID: string;
}
export interface AlternateURL {
    DetailsLink: string;
    VideoLink?: string | null;
}
export interface OpenHouseEntity {
    StartTime: string;
    StartDateTime: string;
    EndDateTime: string;
    FormattedDateTime: string;
    EventTypeID: string;
}
export interface PinsEntity {
    key: string;
    propertyId: string;
    count: number;
    longitude: string;
    latitude: string;
}
