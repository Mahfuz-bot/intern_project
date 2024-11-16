"use client"

import React, { useEffect, useCallback, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Product } from "@/types"
import { ProductModal } from "@/views/products/productModal/productModal"
import { BackToHome } from "@/components/backToHome/backToHome"
import { ProductList } from "@/views/products/productList/productList"
import { PaginationControls } from "@/views/products/paginationControls/paginationControls"
import { usePagination } from "@/hooks/usePagination"
import { PRODUCTS_DATA } from "@/data/productsData"

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 })

  const router = useRouter()
  const searchParams = useSearchParams()
  const productIdFromUrl = searchParams.get("productId")

  // Open modal based on URL query parameter
  useEffect(() => {
    if (productIdFromUrl) {
      const product = PRODUCTS_DATA.find((item) => item.id === productIdFromUrl)
      if (product) setSelectedProduct(product)
    }
  }, [productIdFromUrl])

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product)
      router.push(`/products?productId=${product.id}`)
    },
    [router]
  )

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
    router.push(`/products`)
  }, [router])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <BackToHome />

        <ProductList
          products={paginatedProducts}
          onOpenModal={handleOpenModal}
        />
        <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
        <div className="h-4" />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </Suspense>

  )
}
