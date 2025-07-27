interface BillingToggleProps {
    billingInterval: 'monthly' | 'yearly'
    onIntervalChange: (interval: 'monthly' | 'yearly') => void
}

export function BillingToggle({ billingInterval, onIntervalChange }: BillingToggleProps) {
    return (
        <div className="flex justify-center pb-2">
            <fieldset aria-label="Payment frequency">
                <div className="grid grid-cols-2 gap-x-1 rounded-full bg-ci-muted-light p-1 text-center text-xs/5 font-semibold text-foreground">
                    <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-ci-main has-checked:text-ci-black cursor-pointer">
                        <input
                            type="radio"
                            name="frequency"
                            value="monthly"
                            checked={billingInterval === 'monthly'}
                            onChange={(e) => onIntervalChange(e.target.value as 'monthly' | 'yearly')}
                            className="absolute inset-0 appearance-none rounded-full cursor-pointer"
                        />
                        <span>Monthly</span>
                    </label>
                    <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-ci-main has-checked:text-ci-black cursor-pointer">
                        <input
                            type="radio"
                            name="frequency"
                            value="yearly"
                            checked={billingInterval === 'yearly'}
                            onChange={(e) => onIntervalChange(e.target.value as 'monthly' | 'yearly')}
                            className="absolute inset-0 appearance-none rounded-full cursor-pointer"
                        />
                        <span>Yearly</span>
                        <span className="ml-1 text-xs bg-ci-warn text-ci-black px-1.5 py-0.5 rounded-full">
                            Save up to 17%
                        </span>
                    </label>
                </div>
            </fieldset>
        </div>
    )
}