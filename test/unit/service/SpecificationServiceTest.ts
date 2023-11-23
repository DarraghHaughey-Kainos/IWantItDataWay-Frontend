import { Specification } from '../../../model/Specification';
import { SpecificationService } from '../../../service/SpecificationService';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');  
const expect = chai.expect;

const specs: Specification[] = [
    {
        specificationId: 1,
        specificationText: 'spec 1'
    }
];

const specificationService: SpecificationService = new SpecificationService();

describe('SpecificationService', function () {
    describe('getAllSpecifications', function () {
        it('should return specifications from response', async () => {
            const mock = new MockAdapter(axios);

            mock.onGet(specificationService.API_URL + '/specifications').reply(200, specs);

            const results: Specification[] = await specificationService.getAllSpecifications();

            expect(results).to.deep.equal(specs);
        });
    });
});