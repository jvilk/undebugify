import transformTools = require('browserify-transform-tools');
import FalafelNode = transformTools.FalafelNode;
import {IUndebugifyOptions} from './interfaces';

interface FalafelExpressionStatement extends FalafelNode, ESTree.ExpressionStatement {}
interface FalafelCallExpression extends FalafelNode, ESTree.CallExpression {}

function isFalafelExpressionStatement(node: FalafelNode): node is FalafelExpressionStatement {
  return node && node.type === 'ExpressionStatement';
}

function isFalafelCallExpression(node: ESTree.Expression): node is FalafelCallExpression {
  return node && node.type === 'CallExpression';
}

function isIdentifier(node: ESTree.Expression): node is ESTree.Identifier {
  return node && node.type === 'Identifier';
}


export = transformTools.makeFalafelTransform<IUndebugifyOptions>("undebugify", {
 includeExtensions: ['.ts', '.js']
}, function (node, transformOptions, done): void {
  // Remove CallExpressions representing:
  // aFunctionInRemove(<any>)
  var toRemove = transformOptions.configData.config.remove;
  if (!Array.isArray(toRemove)) {
    throw new TypeError(`Invalid configuration: ${toRemove}`);
  }
  if (isFalafelExpressionStatement(node)) {
    var expression = node.expression;
    if (isFalafelCallExpression(expression)) {
      var callee = expression.callee;
      if (isIdentifier(callee) && toRemove.indexOf(callee.name) > -1) {
        // Remove node.
        node.update('');
      }
    }
  }
  done();
});