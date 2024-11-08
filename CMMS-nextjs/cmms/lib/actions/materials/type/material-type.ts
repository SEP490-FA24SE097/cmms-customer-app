

export type IMaterial = {
    material : IMaterialChild,
    variants : IVariants[]
}


export type IMaterialChild = {
    id: string,
    name: string,
    barCode: number,
    category: string,
    unit: string,
    supplier: string,
    description: string,
    salePrice: number,
    minStock: number,
    brand: string,
    isRewardEligible: boolean,
    imageUrl:string,
    subImages: string
}

// {
//     "variantId": "14eae9b8-18ca-444f-8561-855bc25b4b53",
//     "sku": "vật liệu 2-biến thể 1",
//     "price": 150000,
//     "image": "https://www.sondulux.net.vn/image/cache/catalog/san-pham/son-dulux-weathershield-colour-protect-01-800x800.jpg",
//     "attributes": [
//       {
//         "name": "kích thước",
//         "value": "lớn"
//       },
//       {
//         "name": "màu",
//         "value": "xanh"
//       }
//     ]
//   },
export type IVariants = {
    variantId : string,
}