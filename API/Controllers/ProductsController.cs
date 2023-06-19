using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.DTOs;
using AutoMapper;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductCategory> _productsCategoryRepo;
        private readonly IUnitOfWork unitOfWork;

        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductCategory> productsCategoryRepo,
        IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
            _productsRepo = productsRepo;
            _productsCategoryRepo = productsCategoryRepo;
        }

        //endpoints
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts
        ([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithCategoriesSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var products = await _productsRepo.ListAsync(spec);
            var totalItems = await _productsRepo.CountAsync(spec);

            var data = _mapper
            .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]

        public async Task<ActionResult<ProductToReturnDto>> GetProducts(int id)
        {
            var spec = new ProductsWithCategoriesSpecification(id);


            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<ProductCategory>>> GetProductCategories()
        {
            return Ok(await _productsCategoryRepo.ListAllAsync());
        }

        //httppost ,put, delete
        //dto

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductToCreateDto productDto)
        {
            // Map the DTO to the Product entity
            var product = _mapper.Map<ProductToCreateDto, Product>(productDto);
            // Add the product to the repository

            unitOfWork.Repository<Product>().Add(product);
            await unitOfWork.Complete();

            // Map the created product back to the DTO and return it
            var createdProductDto = _mapper.Map<Product, ProductToCreateDto>(product);

            return CreatedAtAction(nameof(GetProducts), new { id = createdProductDto.Name }, createdProductDto);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, ProductToUpdateDto productDto)
        {
            // Retrieve the product from the repository
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            // Update the product properties with values from the DTO
            _mapper.Map(productDto, product);

            // Save the changes to the repository
            await unitOfWork.Complete();

            // Map the updated product back to the DTO and return it
            var updatedProductDto = _mapper.Map<Product, ProductToUpdateDto>(product);

            return Ok(updatedProductDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Retrieve the product from the repository
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            // Remove the product from the repository
            unitOfWork.Repository<Product>().Delete(product);
            await unitOfWork.Complete();

            return NoContent();
        }







    }
}