import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResOp } from '@/common/model/response.model';

interface ApiResultOptions<T> {
  model?: T;
  isArray?: boolean;
  isPager?: boolean;
}

const baseTypeNames = ['String', 'Number', 'Boolean'];

export const ApiResult = <TModel extends Type<any>>(
  options: ApiResultOptions<TModel>,
) => {
  const { model, isArray, isPager } = options;
  const modelIsBaseType = model && baseTypeNames.includes(model.name);
  const items = modelIsBaseType
    ? { type: model.name.toLocaleLowerCase() }
    : model
      ? { $ref: getSchemaPath(model) }
      : { type: 'null', default: null };

  let prop: any = null;
  if (isArray && isPager) {
    prop = {
      type: 'object',
      properties: {
        records: {
          type: 'array',
          items,
        },
        current: {
          type: 'number',
          description: '当前页码',
          default: 1,
        },
        pageSize: {
          type: 'number',
          description: '每页条数',
          default: 10,
        },
        total: {
          type: 'number',
          description: '总条数',
          default: 0,
        },
      },
    };
  } else if (isArray) {
    prop = {
      type: 'array',
      items,
    };
  } else if (model) {
    prop = items;
  } else {
    prop = { type: 'null', default: null };
  }
  return applyDecorators(
    ApiExtraModels(...(model && !modelIsBaseType ? [ResOp, model] : [ResOp])),
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResOp) }, { properties: { data: prop } }],
      },
    }),
  );
};
