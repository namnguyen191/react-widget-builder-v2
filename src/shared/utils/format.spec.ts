import { expect, test } from 'vitest';

import { stringToGraphQL } from './format';

// eslint-disable-next-line no-useless-escape
const SUPPORTED_RAW_TEMPLATE = `"query ($tenantId : String!, $supplierComplianceRequirementId : String =\"85c8cdf2-fcad-447c-8c32-ef5c36ee05e2\"#\"3ba70dca-a9f1-45b6-a196-136b1de86e52\"#\"1f2e8a4a-d474-4c1f-95b1-7b8e40db32b1\"\n) {\n  businessObjects (\n    hint : {\n      viewId : \"graph\"\n    }\n    simpleFilter : {\n    tenantId : $tenantId type: SupplierComplianceRequirement\n    id: $supplierComplianceRequirementId\n    },\n    advancedFilter: {EQUALS: [{SELECT: \"activeComplianceRecord.sourceType\"}, {VALUE: \"Supplier\"}]}\n  ){\n    edges {\n      object {\n        ... on SupplierComplianceRequirement {\n          id\n          product {\n            id\n            partNumber\n            name\n          }\n          supplier {\n            id\n            organizationIdentifier\n          }\n          complianceRecordType\n        }\n      }\n    }\n  }\n}"`;

test('stringToGraphQL should support raw graphql query', () => {
  expect(() => stringToGraphQL(SUPPORTED_RAW_TEMPLATE)).not.toThrowError();
});
