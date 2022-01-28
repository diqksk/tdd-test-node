const productController = require("../../controller/product");
const productModel = require("../../model/Product");
const httpMocks = require("node-mocks-http"); //request, response객체 생성
const newProduct = require("../data/new-product.json");

/**
 * 단위테스트의 특성은 의존되면 안되기 때문에 몽고디비는 무조건 성공한다고 가정한다.
 */
productModel.create = jest.fn(); //호출이 됐는지 안됐는지 스파이 (mock function)
let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("product controller create", () => {
  beforeEach(() => {
    //테스트케이스들이 실행되기 전에 미리 실행됨
    req.body = newProduct;
  });

  it("should have a create product function", () => {
    expect(typeof productController.createProduct).toBe("function"); //프로덕트.createContorller가 function인지 체크
  });

  it("should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next); //createProduct를 호출시 productModel.create가 호출되는지 확인
    expect(productModel.create).toBeCalledWith(newProduct); //create가 newProduct오브젝트와 함께 불린다.
  });

  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201); //201 status를 체크
    expect(res._isEndCalled()).toBeTruthy(); // send가 정상적으로 오는지 확인하기 위한 함수
  });

  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct); // createProduct를 하고 나온 resposne의 json데이터를 newProduct와 비교
  });

  it("should handle errors", async () => {
    const errorMsg = { message: "description property missing" };
    const rejectPromise = Promise;
  });
});
