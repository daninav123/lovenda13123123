import React from 'react';

const SAMPLE_BUDGET = {
  total: 25000,
  spent: 18500,
  remaining: 6500,
  categories: [
    { name: 'Salón', budget: 10000, spent: 10000 },
    { name: 'Catering', budget: 8000, spent: 6500 },
    { name: 'Fotografía', budget: 3000, spent: 2000 },
    { name: 'Vestuario', budget: 2000, spent: 0 },
    { name: 'Decoración', budget: 2000, spent: 0 },
  ]
};

export const BudgetWidget = ({ config }) => {
  const { currency = '€' } = config;
  const { total, spent, remaining, categories } = SAMPLE_BUDGET;
  const percentageSpent = Math.round((spent / total) * 100);
  const percentageRemaining = 100 - percentageSpent;

  return (
    <div className="h-full">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Presupuesto total</span>
          <span className="text-sm font-semibold">{total.toLocaleString()}{currency}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${percentageSpent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{percentageSpent}% gastado</span>
          <span>{percentageRemaining}% restante</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm">Total gastado:</span>
          <span className="font-medium">{spent.toLocaleString()}{currency}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Restante:</span>
          <span className="font-medium">{remaining.toLocaleString()}{currency}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Por categoría:</h4>
        <div className="space-y-2">
          {categories.map((category, index) => {
            const categoryPercentage = Math.round((category.spent / category.budget) * 100) || 0;
            const isOverBudget = category.spent > category.budget;
            
            return (
              <div key={index} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>{category.name}</span>
                  <span className={isOverBudget ? 'text-red-600' : ''}>
                    {category.spent.toLocaleString()}{currency} / {category.budget.toLocaleString()}{currency}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      isOverBudget ? 'bg-red-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Ver presupuesto detallado →
        </button>
      </div>
    </div>
  );
};
