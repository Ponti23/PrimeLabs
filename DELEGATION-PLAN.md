# PrimeLabs delegation

The owner requested this project-local adaptation of ponti-kit on 7 September 2026.

| Role | Model | Responsibility |
| --- | --- | --- |
| Lead | Astra (`gpt-6-astra`) | Design direction, task decomposition, implementation, integration and final verification |
| Implementation support | Sol (`gpt-5.6-sol`) | Bounded features, complex forms and functional verification |
| Focused support | Luna (`gpt-5.6-luna`) | Repository research, small changes and independent reviews |

Astra owns the overall result and may implement directly. Delegate only independent work with explicit file ownership. Avoid simultaneous writes to shared files. Use an agent other than the author for independent review; Astra resolves findings and verifies the combined build. Claude-specific routing in the upstream kit does not apply to this project.

For frontend work, use PRODUCT.md for business facts and DESIGN.md for the visual system. The current redesign has the owner's creative-freedom authorization. Publishing, changing business prices and creating real customer bookings require separate user intent.

This is a lightweight project adaptation; the global ponti-kit installation is unchanged.
